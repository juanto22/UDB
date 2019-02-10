/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.udb.diagram.renderer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.faces.FacesException;
import javax.faces.component.UIComponent;
import javax.faces.component.UIParameter;
import javax.faces.component.behavior.ClientBehavior;
import javax.faces.component.behavior.ClientBehaviorContext;
import javax.faces.component.behavior.ClientBehaviorHolder;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;

import org.primefaces.behavior.confirm.ConfirmBehavior;
import org.primefaces.component.api.AjaxSource;
import org.primefaces.component.menu.AbstractMenu;
import org.primefaces.component.menu.BaseMenuRenderer;
import org.primefaces.component.menu.Menu;
import org.primefaces.context.RequestContext;
import org.primefaces.model.diagram.Connection;
import org.primefaces.model.diagram.DiagramModel;
import org.primefaces.model.diagram.Element;
import org.primefaces.model.menu.DefaultMenuModel;
import org.primefaces.model.menu.MenuElement;
import org.primefaces.model.menu.MenuItem;
import org.primefaces.model.menu.MenuModel;
import org.primefaces.util.AjaxRequestBuilder;
import org.primefaces.util.SharedStringBuilder;
import org.primefaces.util.WidgetBuilder;

import com.udb.diagram.config.Diagram;

import com.udb.diagram.config.UIMenuItem;
import com.udb.model.Estado;
import com.org.security.enums.TipoEtapa;
import com.org.security.utils.DiagramConnection;
import com.org.security.utils.DiagramElement;

/**
 *
 * @author juan.renderos
 */
public class DiagramRenderer extends org.primefaces.component.diagram.DiagramRenderer {

	private static final String SB_BUILD_NON_AJAX_REQUEST = BaseMenuRenderer.class.getName() + "#buildNonAjaxRequest";
	private UIComponent parentForm = null;

	@Override
	protected void encodeMarkup(FacesContext context, org.primefaces.component.diagram.Diagram diagramAux)
			throws IOException {
		ResponseWriter writer = context.getResponseWriter();

		Diagram diagram = null;
		boolean jerarquia = false;

		if (diagramAux instanceof Diagram) {
			diagram = (Diagram) diagramAux;
		}

		parentForm = diagram.getParent();

		DiagramModel model = (DiagramModel) diagram.getValue();
		String clientId = diagram.getClientId(context);
		String style = diagram.getStyle();
		String styleClass = diagram.getStyleClass();
		styleClass = (styleClass == null) ? Diagram.CONTAINER_CLASS : Diagram.CONTAINER_CLASS + " " + styleClass;
		UIComponent elementFacet = diagram.getFacet("element");
		Map<String, Object> requestMap = context.getExternalContext().getRequestMap();
		String var = diagram.getVar();

		writer.startElement("div", diagram);
		writer.writeAttribute("id", diagram.getClientId(context), null);
		writer.writeAttribute("class", styleClass, null);

		if (style != null) {
			writer.writeAttribute("style", style, null);
		}

		if (model != null) {
			List<Element> elements = model.getElements();
			List<Connection> connections = model.getConnections();

			if (elements != null && !elements.isEmpty()) {
				for (int i = 0; i < elements.size(); i++) {
					DiagramElement<?, ?> element = (DiagramElement<?, ?>) elements.get(i);
					jerarquia = false;
					String[] id = element.getId().split("-");
					String elementClass = element.getStyleClass();
					elementClass = (elementClass == null) ? Diagram.ELEMENT_CLASS
							: Diagram.ELEMENT_CLASS + " " + elementClass;
					if (element.isDraggable()) {
						elementClass = elementClass + " " + Diagram.DRAGGABLE_ELEMENT_CLASS;
					}
					Object data = element.getData();
					String x = element.getX();
					String y = element.getY();
					String coords = "left:" + x + ";top:" + y;
					String aceptacionStyle = 
							TipoEtapa.ACEPTACION.equals(((Estado) element.getEntity()).getTipoEtapa()) 
							? "element-aceptacion" 
									: "";

//					writer.startElement("div", null);// para aceptacion
//					writer.writeAttribute("class", aceptacionStyle, null);// para aceptacion
					writer.startElement("div", null);
					writer.writeAttribute("id", clientId + "-" + element.getId(), null);
					writer.writeAttribute("class", elementClass, null);
					writer.writeAttribute("style", coords, null);
					writer.writeAttribute("ondblclick", diagram.getOndblclickNameFunction() + "(" + id[1] + ")", null);

					if (elementFacet != null && var != null) {
						requestMap.put(var, data);
						elementFacet.encodeAll(context);
					} else if (data != null) {
						writer.writeText(data, null);
					}
					writer.endElement("div");
//					writer.endElement("div");// para aceptacion

					// Para contextMenu
					if (!diagram.getChildren().isEmpty()) {
						for (Connection con : connections) {
							DiagramConnection<?, ?> safiConnection = (DiagramConnection<?, ?>) con;
							if (id[1].equals(safiConnection.getTargetEntity().getId().toString())) {
								jerarquia = true;
								break;
							}
						}

						List<UIComponent> menuItems = diagram.getChildren();

						AbstractMenu menuAux = makeMenu("ctx" + element.getElemento() + "-" + element.getId(),
								menuItems, element.getTipoClasificador(), jerarquia);

						safiEncodeMenu(context, menuAux, /* style */"",
								org.primefaces.component.contextmenu.ContextMenu.CONTAINER_CLASS, "no-role");
						encodeScript(context, menuAux, clientId + "-" + element.getId());
					}
				}
			}

			if (var != null) {
				requestMap.remove(var);
			}
		}

		writer.endElement("div");
	}

	public AbstractMenu makeMenu(String id, final List<UIComponent> menuElements, final String tipoClasificador,
			final boolean jerarquia) {
		AbstractMenu menu = new AbstractMenu() {

			@Override
			public MenuModel getModel() {
				MenuModel model = new DefaultMenuModel();

				for (UIComponent uiComponent : menuElements) {
					UIMenuItem menuItem = (UIMenuItem) uiComponent;

					if (menuItem.getTipoClasificador() != null && !menuItem.getTipoClasificador().isEmpty()) {
						if (menuItem.getTipoClasificador().equals(tipoClasificador)) {
							model.addElement(menuItem);
						}
					} else {
						if (!menuItem.getJerarquia()) {
							model.addElement(menuItem);
						} else {
							// cuando si se true
							if (jerarquia) {
								if (menuItem.getJerarquia()) {
									model.addElement(menuItem);
								}
							}
						}
					}
				}

				return model;
			}
		};

		menu.setId(id);

		return menu;
	}

	protected void safiEncodeMenu(FacesContext context, AbstractMenu menu, String style, String styleClass, String role)
			throws IOException {
		ResponseWriter writer = context.getResponseWriter();
		UIComponent optionsFacet = menu.getFacet("options");

		writer.startElement("div", menu);
		writer.writeAttribute("id", menu.getClientId(context), "id");
		writer.writeAttribute("class", styleClass, "styleClass");
		if (style != null) {
			writer.writeAttribute("style", style, "style");
		}
		writer.writeAttribute("role", "menubar", null);

		encodeKeyboardTarget(context, menu);

		writer.startElement("ul", null);
		writer.writeAttribute("class", Menu.LIST_CLASS, null);

		if (menu.getElementsCount() > 0) {
			safiEncodeElements(context, menu, menu.getElements());
		}

		if (optionsFacet != null) {
			writer.startElement("li", null);
			writer.writeAttribute("class", Menu.OPTIONS_CLASS, null);
			writer.writeAttribute("role", "menuitem", null);
			optionsFacet.encodeAll(context);
			writer.endElement("li");
		}

		writer.endElement("ul");

		writer.endElement("div");
	}

	protected void encodeKeyboardTarget(FacesContext context, AbstractMenu menu) throws IOException {
		ResponseWriter writer = context.getResponseWriter();

		writer.startElement("div", null);
		writer.writeAttribute("tabindex", menu.getTabindex(), null);
		writer.writeAttribute("class", "ui-helper-hidden-accessible", null);
		writer.endElement("div");
	}

	protected void safiEncodeElements(FacesContext context, AbstractMenu menu, List<MenuElement> elements)
			throws IOException {
		ResponseWriter writer = context.getResponseWriter();

		for (MenuElement element : elements) {
			if (element.isRendered()) {
				if (element instanceof MenuItem) {
					MenuItem menuItem = (MenuItem) element;
					String containerStyle = menuItem.getContainerStyle();
					String containerStyleClass = menuItem.getContainerStyleClass();
					containerStyleClass = (containerStyleClass == null) ? Menu.MENUITEM_CLASS
							: Menu.MENUITEM_CLASS + " " + containerStyleClass;

					writer.startElement("li", null);
					writer.writeAttribute("class", containerStyleClass, null);
					writer.writeAttribute("role", "menuitem", null);
					if (containerStyle != null) {
						writer.writeAttribute("style", containerStyle, null);
					}
					String[] auxId = menu.getId().split("-");

					encodeMenuItem(context, menu, menuItem, auxId[2]);
					writer.endElement("li");
				}
				// else if(element instanceof Submenu) {
				// Submenu submenu = (Submenu) element;
				// String style = submenu.getStyle();
				// String styleClass = submenu.getStyleClass();
				// styleClass = styleClass == null ? Menu.TIERED_SUBMENU_CLASS :
				// Menu.TIERED_SUBMENU_CLASS + " " + styleClass;
				//
				// writer.startElement("li", null);
				// if(shouldRenderId(submenu)) {
				// writer.writeAttribute("id", submenu.getClientId(), null);
				// }
				// writer.writeAttribute("class", styleClass, null);
				// if(style != null) {
				// writer.writeAttribute("style", style, null);
				// }
				// writer.writeAttribute("role", "menuitem", null);
				// writer.writeAttribute("aria-haspopup", "true", null);
				// encodeSubmenu(context, menu, submenu);
				// writer.endElement("li");
				// }
				// else if(element instanceof Separator) {
				// encodeSeparator(context, (Separator) element);
				// }
			}
		}
	}

	protected void encodeScript(FacesContext context, AbstractMenu abstractMenu, String idFor) throws IOException {
		try {
			WidgetBuilder wb = getWidgetBuilder(context);
			wb.initWithDomReady("ContextMenu", "widget_" + abstractMenu.getClientId(), abstractMenu.getClientId());

			String _for = idFor;
			if (_for != null) {
				// UIComponent target = SearchExpressionFacade.resolveComponent(context,
				// menuAux, _for);

				wb.attr("target", _for).attr("type", "Diagram");

				// if(target instanceof Widget) {
				// wb.attr("targetWidgetVar", ((Widget) target).resolveWidgetVar());
				// }
			}

			wb.attr("nodeType", null, null).attr("event", null, null).attr("selectionMode", "multiple", "multiple")
					.callback("beforeShow", "function(event)", null).attr("targetFilter", null, null);

			wb.finish();
		} catch (Exception e) {
			// System.out.println("JR ERROR:" + e.getMessage());
		}
	}

	protected void encodeMenuItem(FacesContext context, AbstractMenu menu, MenuItem menuitem, String skid)
			throws IOException {
		ResponseWriter writer = context.getResponseWriter();
		String title = menuitem.getTitle();

		if (menuitem.shouldRenderChildren()) {
			renderChildren(context, (UIComponent) menuitem);
		} else {
			boolean disabled = menuitem.isDisabled();
			String style = menuitem.getStyle();

			writer.startElement("a", null);
			writer.writeAttribute("tabindex", "-1", null);
			if (shouldRenderId(menuitem)) {
			}
			writer.writeAttribute("id", skid, null);
			if (title != null) {
				writer.writeAttribute("title", title, null);
			}

			String styleClass = this.getLinkStyleClass(menuitem);
			if (disabled) {
				styleClass = styleClass + " ui-state-disabled";
			}

			writer.writeAttribute("class", styleClass, null);

			if (style != null) {
				writer.writeAttribute("style", style, null);
			}

			if (disabled) {
				writer.writeAttribute("href", "#", null);
				writer.writeAttribute("onclick", "return false;", null);
			} else {
				setConfirmationScript(context, menuitem);
				String onclick = menuitem.getOnclick();

				// GET
				String command = "";
				if (menuitem.getUrl() != null || menuitem.getOutcome() != null) {
					String targetURL = "";/* getTargetURL(context, (UIOutcomeTarget) menuitem); */
					writer.writeAttribute("href", targetURL, null);

					if (menuitem.getTarget() != null) {
						writer.writeAttribute("target", menuitem.getTarget(), null);
					}
				}
				// POST
				else {
					writer.writeAttribute("href", "#", null);

					UIComponent form = parentForm;
					if (form == null) {
						throw new FacesException("MenuItem must be inside a form element");
					}

					if (menuitem.isDynamic()) {
						String menuClientId = menu.getClientId(context);
						Map<String, List<String>> params = menuitem.getParams();
						if (params == null) {
							params = new LinkedHashMap<String, List<String>>();
						}
						List<String> idParams = new ArrayList<String>();
						idParams.add(menuitem.getId());
						params.put(menuClientId + "_menuid", idParams);

						command = menuitem.isAjax()
								? buildAjaxRequest(context, menu, (AjaxSource) menuitem, form, params)
								: buildNonAjaxRequest(context, menu, form, menuClientId, params, true);
					} else {
						command = menuitem.isAjax() ? buildAjaxRequest(context, (AjaxSource) menuitem, form)
								: buildNonAjaxRequest(context, ((UIComponent) menuitem), form,
										((UIComponent) menuitem).getClientId(context), true);
					}

					onclick = (onclick == null) ? command : onclick + ";" + command;
				}

				if (onclick != null) {
					if (menuitem.requiresConfirmation()) {
						writer.writeAttribute("data-pfconfirmcommand", onclick, null);
						writer.writeAttribute("onclick", menuitem.getConfirmationScript(), "onclick");
					} else {
						writer.writeAttribute("onclick", onclick, null);
					}
				}
			}

			encodeMenuItemContent(context, menu, menuitem);

			writer.endElement("a");
		}
	}

	/* METODOS NECESARIOS PARA PINTAR MENU */
	protected boolean shouldRenderId(MenuElement element) {
		if (element instanceof UIComponent)
			return shouldWriteId((UIComponent) element);
		else
			return false;
	}

	protected String getLinkStyleClass(MenuItem menuItem) {
		String styleClass = menuItem.getStyleClass();

		return (styleClass == null) ? AbstractMenu.MENUITEM_LINK_CLASS
				: AbstractMenu.MENUITEM_LINK_CLASS + " " + styleClass;
	}

	protected String buildAjaxRequest(FacesContext context, AbstractMenu menu, AjaxSource source, UIComponent form,
			Map<String, List<String>> params) {
		String clientId = menu.getClientId(context);

		AjaxRequestBuilder builder = RequestContext.getCurrentInstance().getAjaxRequestBuilder();

		builder.init().source(clientId).process(menu, source.getProcess()).update(menu, source.getUpdate())
				.async(source.isAsync()).global(source.isGlobal()).delay(source.getDelay()).timeout(source.getTimeout())
				.partialSubmit(source.isPartialSubmit(), source.isPartialSubmitSet(), source.getPartialSubmitFilter())
				.resetValues(source.isResetValues(), source.isResetValuesSet())
				.ignoreAutoUpdate(source.isIgnoreAutoUpdate()).onstart(source.getOnstart()).onerror(source.getOnerror())
				.onsuccess(source.getOnsuccess()).oncomplete(source.getOncomplete()).params(params);

		if (form != null) {
			builder.form(form.getClientId(context));
		}

		builder.preventDefault();

		return builder.build();
	}

	protected String buildNonAjaxRequest(FacesContext context, UIComponent component, UIComponent form,
			String decodeParam, Map<String, List<String>> parameters, boolean submit) {
		StringBuilder request = SharedStringBuilder.get(context, SB_BUILD_NON_AJAX_REQUEST);
		String formId = form.getClientId(context);
		Map<String, Object> params = new HashMap<String, Object>();

		if (decodeParam != null) {
			params.put(decodeParam, decodeParam);
		}

		for (UIComponent child : component.getChildren()) {
			if (child instanceof UIParameter && child.isRendered()) {
				UIParameter param = (UIParameter) child;
				params.put(param.getName(), param.getValue());
			}
		}

		if (parameters != null && !parameters.isEmpty()) {
			for (Iterator<String> it = parameters.keySet().iterator(); it.hasNext();) {
				String paramName = it.next();
				params.put(paramName, parameters.get(paramName).get(0));
			}
		}

		// append params
		if (!params.isEmpty()) {
			request.append("PrimeFaces.addSubmitParam('").append(formId).append("',{");

			for (Iterator<String> it = params.keySet().iterator(); it.hasNext();) {
				String key = it.next();
				Object value = params.get(key);

				request.append("'").append(key).append("':'").append(value).append("'");

				if (it.hasNext())
					request.append(",");
			}

			request.append("})");
		}

		if (submit) {
			request.append(".submit('").append(formId).append("');return false;");
		}

		return request.toString();
	}

	protected void setConfirmationScript(FacesContext context, MenuItem item) {
		if (item instanceof ClientBehaviorHolder) {
			Map<String, List<ClientBehavior>> behaviors = ((ClientBehaviorHolder) item).getClientBehaviors();
			List<ClientBehavior> clickBehaviors = (behaviors == null) ? null : behaviors.get("click");

			if (clickBehaviors != null && !clickBehaviors.isEmpty()) {
				for (int i = 0; i < clickBehaviors.size(); i++) {
					ClientBehavior clientBehavior = clickBehaviors.get(i);
					if (clientBehavior instanceof ConfirmBehavior) {
						ClientBehaviorContext cbc = ClientBehaviorContext.createClientBehaviorContext(context,
								(UIComponent) item, "click", item.getClientId(), Collections.EMPTY_LIST);
						clientBehavior.getScript(cbc);
						break;
					}
				}
			}
		}
	}

	protected void encodeMenuItemContent(FacesContext context, AbstractMenu menu, MenuItem menuitem)
			throws IOException {
		ResponseWriter writer = context.getResponseWriter();
		String icon = menuitem.getIcon();
		Object value = menuitem.getValue();

		if (icon != null) {
			writer.startElement("span", null);
			writer.writeAttribute("class", AbstractMenu.MENUITEM_ICON_CLASS + " " + icon, null);
			writer.endElement("span");
		}

		if (value != null) {
			writer.startElement("span", null);
			writer.writeAttribute("class", AbstractMenu.MENUITEM_TEXT_CLASS, null);
			writer.writeText(value, "value");
			writer.endElement("span");
		}
	}
}

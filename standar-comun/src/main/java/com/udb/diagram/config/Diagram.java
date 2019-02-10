/*
 * Copyright 2009-2013 PrimeTek.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.udb.diagram.config;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.event.AjaxBehaviorEvent;
import javax.faces.event.FacesEvent;

import org.primefaces.model.diagram.DiagramModel;
import org.primefaces.model.diagram.Element;
import org.primefaces.util.Constants;

import com.udb.diagram.config.event.ConnectionClickEvent;
import com.udb.diagram.config.event.ElementClickEvent;
import com.udb.diagram.config.event.ElementDropEvent;

public class Diagram extends org.primefaces.component.diagram.Diagram {

	private static final Collection<String> EVENT_NAMES = Collections
			.unmodifiableCollection(Arrays.asList("connect", "disconnect",
					"connectionChange", "connectionClick", "elementClick",
					"elementDrop", "contextMenu"));

	private static final String DEFAULT_RENDERER = "org.primefaces.component.DiagramRenderer";

	protected enum PropertyKeys {

		widgetVar, var, style, styleClass, ondblclickNameFunction;

		String toString;

		PropertyKeys(String toString) {
			this.toString = toString;
		}

		PropertyKeys() {
		}

		public String toString() {
			return (this.toString != null ? this.toString : super.toString());
		}
	}

	public Diagram() {
		setRendererType(DEFAULT_RENDERER);
	}

	public String getFamily() {
		return COMPONENT_FAMILY;
	}

	public java.lang.String getWidgetVar() {
		return (java.lang.String) getStateHelper().eval(PropertyKeys.widgetVar,
				null);
	}

	public void setWidgetVar(java.lang.String _widgetVar) {
		getStateHelper().put(PropertyKeys.widgetVar, _widgetVar);
	}

	public java.lang.String getVar() {
		return (java.lang.String) getStateHelper().eval(PropertyKeys.var, null);
	}

	public void setVar(java.lang.String _var) {
		getStateHelper().put(PropertyKeys.var, _var);
	}

	public java.lang.String getStyle() {
		return (java.lang.String) getStateHelper().eval(PropertyKeys.style,
				null);
	}

	public void setStyle(java.lang.String _style) {
		getStateHelper().put(PropertyKeys.style, _style);
	}

	public java.lang.String getStyleClass() {
		return (java.lang.String) getStateHelper().eval(
				PropertyKeys.styleClass, null);
	}

	public void setStyleClass(java.lang.String _styleClass) {
		getStateHelper().put(PropertyKeys.styleClass, _styleClass);
	}

	public java.lang.String getOndblclickNameFunction() {
		return (java.lang.String) getStateHelper().eval(
				PropertyKeys.ondblclickNameFunction, null);
	}

	public void setOndblclickNameFunction(
			java.lang.String _ondblclickNameFunction) {
		getStateHelper().put(PropertyKeys.ondblclickNameFunction,
				_ondblclickNameFunction);
	}

	@Override
	public Collection<String> getEventNames() {
		return EVENT_NAMES;
	}

	private boolean partialSourceParam(FacesContext context) {
		return this.getClientId(context).equals(
				context.getExternalContext().getRequestParameterMap()
						.get(Constants.RequestParams.PARTIAL_SOURCE_PARAM));
	}

	@Override
	public void queueEvent(FacesEvent event) {
		FacesContext context = getFacesContext();

		if (partialSourceParam(context) && event instanceof AjaxBehaviorEvent) {
			Map<String, String> params = context.getExternalContext()
					.getRequestParameterMap();
			String eventName = params
					.get(Constants.RequestParams.PARTIAL_BEHAVIOR_EVENT_PARAM);
			String clientId = this.getClientId(context);
			AjaxBehaviorEvent behaviorEvent = (AjaxBehaviorEvent) event;
			DiagramModel model = (DiagramModel) this.getValue();

			if (model != null) {
				switch (eventName) {
				case "connectionClick":
					Element sourceElement = model.findElement(params
							.get(clientId + "_sourceId"));
					Element targetElement = model.findElement(params
							.get(clientId + "_targetId"));
					ConnectionClickEvent connectionClickEvent = new ConnectionClickEvent(
							this, behaviorEvent.getBehavior(), sourceElement,
							targetElement);
					connectionClickEvent.setPhaseId(behaviorEvent.getPhaseId());
					parentQueueEvent(connectionClickEvent);
					break;
				case "elementDrop":

					Element element = model.findElement(params.get(clientId
							+ "_elementId"));
					String ejeX = params.get(clientId + "_left");
					String ejeY = params.get(clientId + "_top");
					ElementDropEvent elementDropEvent = new ElementDropEvent(
							this, behaviorEvent.getBehavior(), element, ejeX,
							ejeY);
					parentQueueEvent(elementDropEvent);
					break;
				case "elementClick":
					Element elementClick = model.findElement(params
							.get(clientId + "_elementId"));

					ElementClickEvent elementClickEvent = new ElementClickEvent(
							this, behaviorEvent.getBehavior(), elementClick);
					parentQueueEvent(elementClickEvent);
					break;
				default:
					super.queueEvent(event);
					break;
				}
			}

		} else {
			super.queueEvent(event);
		}

	}

	/**
	 * @param event
	 * @throws IllegalStateException
	 *             {@inheritDoc}
	 * @throws NullPointerException
	 *             {@inheritDoc}
	 */
	public void parentQueueEvent(FacesEvent event) {

		if (event == null) {
			throw new NullPointerException();
		}
		UIComponent parent = getParent();
		if (parent == null) {
			throw new IllegalStateException();
		} else {
			parent.queueEvent(event);
		}

	}

}

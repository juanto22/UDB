package com.org.web.views;

import java.io.Serializable;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.faces.model.SelectItem;
import javax.inject.Inject;
import javax.inject.Named;

import org.hibernate.exception.GenericJDBCException;
import org.omnifaces.cdi.ViewScoped;
import org.omnifaces.util.Messages;
import org.picketlink.Identity;
import org.primefaces.context.RequestContext;
import org.primefaces.event.diagram.ConnectEvent;
import org.primefaces.event.diagram.ConnectionChangeEvent;
import org.primefaces.event.diagram.DisconnectEvent;
import org.primefaces.model.diagram.Connection;
import org.primefaces.model.diagram.DefaultDiagramModel;
import org.primefaces.model.diagram.Element;
import org.primefaces.model.diagram.endpoint.DotEndPoint;
import org.primefaces.model.diagram.endpoint.EndPoint;
import org.primefaces.model.diagram.endpoint.EndPointAnchor;
import org.primefaces.model.diagram.endpoint.RectangleEndPoint;
import org.primefaces.model.diagram.overlay.ArrowOverlay;

import com.org.security.enums.TipoConectorEnum;
import com.org.security.enums.TipoEtapa;
import com.org.security.identity.model.UserTypeEntity;
import com.org.security.identity.stereotype.User;
import com.org.security.utils.DiagramConnection;
import com.org.security.utils.DiagramElement;
import com.org.security.utils.DibujaNodo;
import com.org.util.enumeration.ViewStatus;
import com.org.util.web.BaseLazyModel;
import com.udb.diagram.config.event.ElementDropEvent;
import com.udb.model.Empleado;
import com.udb.model.Estado;
import com.udb.model.Transicion;
import com.udb.service.EmpleadoService;
import com.udb.service.EstadoService;
import com.udb.service.TransicionService;

import lombok.Getter;
import lombok.Setter;

@Named
@ViewScoped
@Getter
@Setter
public class AutomataView implements Serializable {

	private static final long serialVersionUID = 43568786343L;

	@Inject
	private Identity identity;

	@Inject
	private EstadoService estadoService;

	@Inject
	private TransicionService transicionService;

	private DefaultDiagramModel model;
	private Transicion transicion;
	private Estado estado;
	private List<TipoEtapa> tiposEtapaList;

	@PostConstruct
	public void init() {
		model = new DefaultDiagramModel();
		model.setMaxConnections(-1);
		model.getDefaultConnectionOverlays().add(new ArrowOverlay(20, 20, 1, 1));
		cargarEstados();
	}

	public void prepareCreate() {
		estado = new Estado();
		estado.setDibuja(new DibujaNodo());
		tiposEtapaList = Arrays.asList(TipoEtapa.values());
	}

	public void cargarEstados() {
		model.clear();
		transicion = new Transicion();
		estado = new Estado();

		DiagramElement<Estado, Long> element = null;
		DiagramElement<Estado, Long> source = null;
		DiagramElement<Estado, Long> target = null;
		EndPoint endPoint = null;

		try {
			for (Estado estado : estadoService.findAll()) {
				element = new DiagramElement<>(estado, estado.getNombre(), estado.getDibuja().getX(),
						estado.getDibuja().getY());

				element.setId("etapa-" + estado.getId().toString());
				element.setStyleClass(estado.getDibuja().getCssClass());
				element.setDraggable(true);

				endPoint = createRectangleEndPoint(EndPointAnchor.TOP, 10, 10, true);
				element.addEndPoint(endPoint);

				endPoint = createRectangleEndPoint(EndPointAnchor.RIGHT, 10, 10, true);
				element.addEndPoint(endPoint);

				endPoint = createDotEndPoint(EndPointAnchor.BOTTOM, 6, true);
				element.addEndPoint(endPoint);

				endPoint = createDotEndPoint(EndPointAnchor.LEFT, 6, true);
				element.addEndPoint(endPoint);

				model.addElement(element);
			}

			for (Transicion transicion : transicionService.findAll()) {

				source = (DiagramElement) model.findElement("etapa-" + transicion.getEtapaInicial().getId().toString());
				target = (DiagramElement) model.findElement("etapa-" + transicion.getEtapaFinal().getId().toString());

				model.connect(createConnection(source.getEndPoints().get(transicion.getConectorFuente().getCode()),
						target.getEndPoints().get(transicion.getConectorDestino().getCode()), source.getEntity(),
						target.getEntity()));
			}
		} catch (Exception e) {
			Messages.create("ERROR!").detail(e.getMessage()).error().add();
		}

	}

	private EndPoint createDotEndPoint(EndPointAnchor anchor, int radius, boolean target) {
		DotEndPoint endPoint = new DotEndPoint(anchor, radius);
		endPoint.setScope("network");
		endPoint.setTarget(target);
		endPoint.setStyle("{fillStyle:'#98AFC7'}");
		endPoint.setHoverStyle("{fillStyle:'#5C738B'}");

		return endPoint;
	}

	private EndPoint createRectangleEndPoint(EndPointAnchor anchor, int width, int height, boolean source) {
		RectangleEndPoint endPoint = new RectangleEndPoint(anchor, width, height);
		endPoint.setScope("network");
		endPoint.setSource(source);
		endPoint.setStyle("{fillStyle:'#98AFC7'}");
		endPoint.setHoverStyle("{fillStyle:'#5C738B'}");

		return endPoint;
	}

	private Connection createConnection(EndPoint from, EndPoint to, Estado source, Estado target) {
		DiagramConnection<Estado, Long> conn = new DiagramConnection<>(from, to);
		conn.setSourceEntity(source);
		conn.setTargetEntity(target);
		return conn;
	}

	public void onDisconnect(DisconnectEvent event) {
		Messages.create("Cambio").detail("Desconectado").error().add();
	}

	public void onConnectionChange(ConnectionChangeEvent event) {
		Messages.create("Cambio").detail("Conexion cambio").add();
	}

	public void onConnect(ConnectEvent event) {
		List<Connection> connectionToDeleteList = new ArrayList<>();
		List<DiagramConnection> connectionList = new ArrayList<>();
		DiagramElement<Estado, Long> sourceElement = null;
		DiagramElement<Estado, Long> targetElement = null;

		for (Connection connection : getModel().getConnections()) {
			if (!(connection instanceof DiagramConnection)) {
				connectionToDeleteList.add(connection);
			} else {
				connectionList.add((DiagramConnection) connection);
			}
		}

		for (Connection connectionToDelete : connectionToDeleteList) {
			getModel().disconnect(connectionToDelete);

			if (event.getSourceElement() instanceof DiagramElement) {
				sourceElement = (DiagramElement) event.getSourceElement();
			}

			if (event.getTargetElement() instanceof DiagramElement) {
				targetElement = (DiagramElement) event.getTargetElement();
			}

			boolean flag = false;
			// validando existencia de conexcion
			if (sourceElement != null && targetElement != null) {
				for (DiagramConnection<Estado, Long> currentConnection : connectionList) {
					if (currentConnection.getSourceEntity().getNombre().equals(sourceElement.getEntity().getNombre())
							&& currentConnection.getTargetEntity().getNombre()
									.equals(targetElement.getEntity().getNombre())) {
						flag = true;
						break;
					}
				}
			}

			if (!flag) {
				if (sourceElement != null && targetElement != null) {
					model.connect(createConnection(connectionToDelete.getSource(), connectionToDelete.getTarget(),
							sourceElement.getEntity(), targetElement.getEntity()));
				}
			} else {
				Messages.create("Agregado").detail("Transición ya existe no se puede agregar una nueva").error().add();
			}
		}
	}

	public void elementDrop(ElementDropEvent elementDropEvent) {
		if (elementDropEvent.getElement() instanceof DiagramElement) {
			model.findElement(elementDropEvent.getElement().getId()).setX(elementDropEvent.getElement().getX());
			model.findElement(elementDropEvent.getElement().getId()).setY(elementDropEvent.getElement().getY());
		}
	}

	public void createDynamicElements() {
		estado.getDibuja().setX("1em");
		estado.getDibuja().setY("3em");

		if (estado.getTipoEtapa().equals(TipoEtapa.INICIAL)) {
			estado.getDibuja().setCssClass("border-radius normal inicial");
		} else if (estado.getTipoEtapa().equals(TipoEtapa.ACEPTACION)) {
			estado.getDibuja().setCssClass("border-radius normal final");
		} else {
			estado.getDibuja().setCssClass("border-radius normal intermedio");
		}

		estadoService.save(estado);
		saveDiagram();
		cargarEstados();

		Messages.create("Agregado").detail("Elemento Agregado").add();

	}

	public void saveDiagram() {
		Estado estadoTemp = null;
		List<Estado> estadoList = new ArrayList<>();
		List<Transicion> transicionList = new ArrayList<>();
		Transicion transicion = null;
		DiagramConnection<Estado, Long> auxConnection = null;

		DiagramElement<Estado, Long> auxElement = null;
		for (Element element : getModel().getElements()) {
			if (element instanceof DiagramElement) {
				auxElement = (DiagramElement) element;
				estadoTemp = auxElement.getEntity();
				estadoTemp.setDibuja(new DibujaNodo());
				if (!element.getX().contains("em")) {
					element.setX(element.getX() + "em");
				}
				if (!element.getY().contains("em")) {
					element.setY(element.getY() + "em");
				}
				estadoTemp.getDibuja().setX(element.getX());
				estadoTemp.getDibuja().setY(element.getY());
				estadoTemp.getDibuja().setCssClass(element.getStyleClass());
				estadoTemp.setNombre(element.getData().toString());
				estadoList.add(estadoTemp);
			}
		}

		for (Connection connection : getModel().getConnections()) {
			auxConnection = (DiagramConnection) connection;
			if (!(auxConnection.getSourceEntity().getId() == null || auxConnection.getTargetEntity().getId() == null)) {

				transicion = transicionService.findTransicion(auxConnection.getSourceEntity(),
						auxConnection.getTargetEntity());
			}

			if (transicion == null) {
				transicion = new Transicion();
			}

			transicion.setEtapaInicial(auxConnection.getSourceEntity());
			transicion.setEtapaFinal(auxConnection.getTargetEntity());
			transicion.setRequiereFirma(false);

			switch (auxConnection.getSource().getAnchor()) {
			case TOP:
				transicion.setConectorFuente(TipoConectorEnum.TOP);
				break;

			case RIGHT:
				transicion.setConectorFuente(TipoConectorEnum.RIGHT);
				break;

			case BOTTOM:
				transicion.setConectorFuente(TipoConectorEnum.BOTTOM);
				break;

			case LEFT:
				transicion.setConectorFuente(TipoConectorEnum.LEFT);
				break;

			default:
				break;
			}

			switch (auxConnection.getTarget().getAnchor()) {
			case TOP:
				transicion.setConectorDestino(TipoConectorEnum.TOP);
				break;

			case RIGHT:
				transicion.setConectorDestino(TipoConectorEnum.RIGHT);
				break;

			case BOTTOM:
				transicion.setConectorDestino(TipoConectorEnum.BOTTOM);
				break;

			case LEFT:
				transicion.setConectorDestino(TipoConectorEnum.LEFT);
				break;

			default:
				break;
			}

			transicionList.add(transicion);

		}

		transicionService.saveDiagram(estadoList, transicionList);

	}
}

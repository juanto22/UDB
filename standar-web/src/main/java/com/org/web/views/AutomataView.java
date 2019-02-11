package com.org.web.views;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

import org.omnifaces.cdi.ViewScoped;
import org.omnifaces.util.Messages;
import org.picketlink.Identity;
import org.primefaces.event.diagram.ConnectEvent;
import org.primefaces.event.diagram.ConnectionChangeEvent;
import org.primefaces.event.diagram.DisconnectEvent;
import org.primefaces.model.diagram.Connection;
import org.primefaces.model.diagram.DefaultDiagramModel;
import org.primefaces.model.diagram.Element;
import org.primefaces.model.diagram.connector.StateMachineConnector;
import org.primefaces.model.diagram.endpoint.DotEndPoint;
import org.primefaces.model.diagram.endpoint.EndPoint;
import org.primefaces.model.diagram.endpoint.EndPointAnchor;
import org.primefaces.model.diagram.endpoint.RectangleEndPoint;
import org.primefaces.model.diagram.overlay.ArrowOverlay;
import org.primefaces.model.diagram.overlay.LabelOverlay;

import com.org.security.enums.TipoConectorEnum;
import com.org.security.enums.TipoEtapa;
import com.org.security.utils.DiagramConnection;
import com.org.security.utils.DiagramElement;
import com.org.security.utils.DibujaNodo;
import com.udb.diagram.config.event.ElementDropEvent;
import com.udb.model.Estado;
import com.udb.model.Transicion;
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
	private TipoEtapa tipoEtapa;
	private ConnectEvent connectEvent;
	private List<TipoEtapa> tiposEtapaList;
	private String transicionName;
	private Long idEstado;
	
	private String cadenaDePrueba;

	@PostConstruct
	public void init() {
		model = new DefaultDiagramModel();
		model.setMaxConnections(-1);
		model.getDefaultConnectionOverlays().add(new ArrowOverlay(7, 20, 1, 1));
		model.setDefaultConnector(createConnector());

		cargarEstados();
	}

	public StateMachineConnector createConnector() {
		StateMachineConnector connector = new StateMachineConnector();
		connector.setPaintStyle("{strokeStyle:'#7D7463', lineWidth:2}");
		connector.setOrientation(StateMachineConnector.Orientation.ANTICLOCKWISE);
		return connector;
	}

	public void prepareCreate() {
		estado = new Estado();
		estado.setDibuja(new DibujaNodo());
		tiposEtapaList = Arrays.asList(TipoEtapa.values());
	}
	
	public void prepareTestAutomata() {
		cadenaDePrueba = "";
	}
	
	public void runTestAutomata() {
		Messages.create("Test").detail("Empieza prueba").add();
		Messages.create("Test value").detail(cadenaDePrueba).add();
	}

	public void checkInitialStage() {
		for (Element element : getModel().getElements()) {
			if (element instanceof DiagramElement) {
				DiagramElement auxElement = (DiagramElement) element;
				Estado estado = (Estado) auxElement.getEntity();
				if (TipoEtapa.INICIAL.equals(estado.getTipoEtapa())) {
					tipoEtapa = TipoEtapa.INICIAL;
					break;
				}
			}
		}
	}

	public void cargarEstados() {
		model.clear();
		try {
			fillModelWithElements();
			createModelTransitions();
		} catch (Exception e) {
			Messages.create("ERROR!").detail(e.getMessage()).error().add();
		}

	}

	public void fillModelWithElements() {
		for (Estado estado : estadoService.findAll()) {
			model.addElement(createElement(estado));
		}
	}

	public DiagramElement<Estado, Long> createElement(Estado estado) {
		DiagramElement<Estado, Long> element = new DiagramElement<>(estado, estado.getNombre(),
				estado.getDibuja().getX(), estado.getDibuja().getY());
		element.setId("etapa-" + estado.getId().toString());
		element.setStyleClass(estado.getDibuja().getCssClass());
		element.setDraggable(true);
		element.addEndPoint(createRectangleEndPoint(EndPointAnchor.TOP, 7, 7, true));
		element.addEndPoint(createRectangleEndPoint(EndPointAnchor.RIGHT, 7, 7, true));
		element.addEndPoint(createDotEndPoint(EndPointAnchor.BOTTOM, 4, true));
		element.addEndPoint(createDotEndPoint(EndPointAnchor.LEFT, 4, true));

		return element;
	}

	public void createModelTransitions() {
		DiagramElement<Estado, Long> source = null;
		DiagramElement<Estado, Long> target = null;

		for (Transicion transicion : transicionService.findAll()) {

			source = (DiagramElement) model.findElement("etapa-" + transicion.getEtapaInicial().getId().toString());
			target = (DiagramElement) model.findElement("etapa-" + transicion.getEtapaFinal().getId().toString());

			model.connect(createConnection(source.getEndPoints().get(transicion.getConectorFuente().getCode()),
					target.getEndPoints().get(transicion.getConectorDestino().getCode()), source.getEntity(),
					target.getEntity(), transicion.getNombre()));
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

	private Connection createConnection(EndPoint from, EndPoint to, Estado source, Estado target, String label) {
		DiagramConnection<Estado, Long> conn = new DiagramConnection<>(from, to);
		conn.setSourceEntity(source);
		conn.setTargetEntity(target);

		conn.getOverlays().add(new LabelOverlay(label, "", 0.5));
		return conn;
	}

	public void onDisconnect(DisconnectEvent event) {
		Messages.create("Cambio").detail("Desconectado").error().add();
	}

	public void onConnectionChange(ConnectionChangeEvent event) {
		Messages.create("Cambio").detail("Conexion cambio").add();
	}

	public void doOnConnect(ConnectEvent event) {
		connectEvent = event;
	}

	public void onConnect() {
		List<Connection> connectionToDeleteList = new ArrayList<>();
		List<DiagramConnection> connectionList = new ArrayList<>();

		for (Connection connection : getModel().getConnections()) {
			if (!(connection instanceof DiagramConnection)) {
				connectionToDeleteList.add(connection);
			} else {
				connectionList.add((DiagramConnection) connection);
			}
		}

		doConnect(connectionToDeleteList, connectionList);

	}

	public void doConnect(List<Connection> connectionToDeleteList, List<DiagramConnection> connectionList) {

		DiagramElement<Estado, Long> sourceElement = getSourceElement();
		DiagramElement<Estado, Long> targetElement = getTargetElement();

		if (sourceElement != null && targetElement != null) {
			for (Connection connectionToDelete : connectionToDeleteList) {
				getModel().disconnect(connectionToDelete);
				if (!checkConnectionExist(sourceElement, targetElement, connectionList)) {
					model.connect(createConnection(connectionToDelete.getSource(), connectionToDelete.getTarget(),
							sourceElement.getEntity(), targetElement.getEntity(), transicionName));

				} else {
					Messages.create("Agregado").detail("Transición ya existe no se puede agregar una nueva").error()
							.add();
				}
			}
		}
	}

	public DiagramElement<Estado, Long> getSourceElement() {
		if (connectEvent != null && connectEvent.getSourceElement() instanceof DiagramElement) {
			return (DiagramElement<Estado, Long>) connectEvent.getSourceElement();
		}

		return null;
	}

	public DiagramElement<Estado, Long> getTargetElement() {
		if (connectEvent.getTargetElement() instanceof DiagramElement) {
			return (DiagramElement<Estado, Long>) connectEvent.getTargetElement();
		}

		return null;
	}

	public boolean checkConnectionExist(DiagramElement<Estado, Long> sourceElement,
			DiagramElement<Estado, Long> targetElement, List<DiagramConnection> connectionList) {
		boolean flag = false;

		for (DiagramConnection<Estado, Long> currentConnection : connectionList) {
			LabelOverlay label = (LabelOverlay) currentConnection.getOverlays().get(0);
			if (currentConnection.getSourceEntity().getNombre().equals(sourceElement.getEntity().getNombre())
					&& currentConnection.getTargetEntity().getNombre().equals(targetElement.getEntity().getNombre())
					&& label.getLabel() != null && label.getLabel().equals(transicionName)) {
				flag = true;
				break;
			}
		}

		return flag;
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
		estado.getDibuja().setCssClass("border-radius normal inicial");

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
				LabelOverlay label = (LabelOverlay) connection.getOverlays().get(0);
				transicion = transicionService.findTransicion(auxConnection.getSourceEntity(),
						auxConnection.getTargetEntity(), label.getLabel());
			}

			if (transicion == null) {
				transicion = new Transicion();
			}

			transicion.setEtapaInicial(auxConnection.getSourceEntity());
			transicion.setEtapaFinal(auxConnection.getTargetEntity());

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
			LabelOverlay label = (LabelOverlay) auxConnection.getOverlays().get(0);
			transicion.setNombre(label.getLabel());
			transicionList.add(transicion);

		}

		transicionService.saveDiagram(estadoList, transicionList);

	}

	public void delete() {
		Estado estadoDelete = estadoService.findOne(idEstado);

		List<Transicion> transicionforSource = transicionService.findbyEtapaInicial(estadoDelete);
		List<Transicion> transicionforTarget = transicionService.findbyEtapaFinal(estadoDelete);

		try {
			transicionService.delete(transicionforSource);
			transicionService.delete(transicionforTarget);

			getModel().getElements().remove(estadoDelete);
			estadoService.delete(estadoDelete);
			getModel().getElements().remove(estadoDelete);
			cargarEstados();

			Messages.create("INFO").detail("Se elimino la etapa satisfactoriamente").add();
		} catch (Exception e) {
			Messages.create("INFO").detail("No se pudo eliminar la etapa").error().add();
		}

	}
}

package com.org.security.utils;

import java.io.Serializable;

import org.primefaces.model.diagram.Connection;
import org.primefaces.model.diagram.connector.Connector;
import org.primefaces.model.diagram.endpoint.EndPoint;
import com.org.util.domain.BaseModelEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DiagramConnection<T extends BaseModelEntity<ID>, ID extends Serializable> extends Connection {

	private T sourceEntity = null;

	private T targetEntity = null;

	/**
	 * Serial de la Clase
	 */
	private static final long serialVersionUID = 5891510618389577696L;

	public DiagramConnection() {
		super();
	}

	public DiagramConnection(EndPoint source, EndPoint target) {
		super(source, target);
	}

	public DiagramConnection(EndPoint source, EndPoint target, Connector connector) {
		super(source, target, connector);
	}

}

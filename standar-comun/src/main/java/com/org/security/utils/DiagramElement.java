package com.org.security.utils;

import java.io.Serializable;
import org.primefaces.model.diagram.Element;
import com.org.util.domain.BaseModelEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DiagramElement<T extends BaseModelEntity<ID>, ID extends Serializable> extends Element {

	private T entity = null;
	private String tipoClasificador;
	private String elemento;

	/**
	 * Serial de la Clase
	 */
	private static final long serialVersionUID = 1655848150500243070L;

	public DiagramElement() {
		super();
	}

	public DiagramElement(T entity, Object data, String x, String y) {
		super(data, x, y);
		setEntity(entity);
	}

	public DiagramElement(T entity, Object data, String tipoClasificador, String elemento, String x, String y) {
		super(data, x, y);
		setEntity(entity);
		setTipoClasificador(tipoClasificador);
		setElemento(elemento);
	}

}

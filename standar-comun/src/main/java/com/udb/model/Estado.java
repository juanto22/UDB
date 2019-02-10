package com.udb.model;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.org.security.enums.TipoEtapa;
import com.org.security.utils.DibujaNodo;
import com.org.util.domain.BaseModelEntity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table()
@SequenceGenerator(name = "SEQ_ETAPA", sequenceName = "SEQ_ETAPA", allocationSize = 1)
@EqualsAndHashCode(of = { "id" })
@ToString(of = { "id", "nombre", "tipoEtapa" })
@Getter
@Setter
public class Estado implements BaseModelEntity<Long> {

	private static final long serialVersionUID = 428271168114686L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_ETAPA")
	@Column(nullable = false)
	Long id;

	@Column(length = 255, nullable = true)
	String nombre;

	@Embedded
	DibujaNodo dibuja;

	@Column
	String tipoEtapa; // Enum

	public TipoEtapa getTipoEtapa() {
		return TipoEtapa.getTipoEtapa(this.tipoEtapa);
	}

	public void setTipoEtapa(TipoEtapa tipoEtapa) {
		this.tipoEtapa = tipoEtapa.getCode();
	}

}

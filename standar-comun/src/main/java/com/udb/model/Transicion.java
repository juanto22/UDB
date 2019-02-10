package com.udb.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.org.security.enums.TipoConectorEnum;
import com.org.util.domain.BaseModelEntity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table()
@SequenceGenerator(name = "SEQ_TRANSICION", sequenceName = "SEQ_TRANSICION", allocationSize = 1)
@EqualsAndHashCode(of = { "id" })
@ToString(of = { "id", "nombre" })
@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
public class Transicion implements BaseModelEntity<Long> {

	private static final long serialVersionUID = 513835398118993L;

	@Id
	@NonNull
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_TRANSICION")
	@Column(nullable = false)
	Long id;

	@Column(nullable = true)
	String nombre;

	@ManyToOne
	@JoinColumns({ @JoinColumn(name = "ETAPAINICIAL_ID", referencedColumnName = "ID") })
	Estado etapaInicial;

	@ManyToOne
	@JoinColumns({ @JoinColumn(name = "ETAPAFINAL_ID", referencedColumnName = "ID") })
	Estado etapaFinal;

	@Column(length = 255, nullable = true)
	private Integer conectorFuente; // Enum

	@Column(length = 255, nullable = true)
	private Integer conectorDestino; // Enum

	public TipoConectorEnum getConectorFuente() {
		return TipoConectorEnum.getTipoConectorEnum(this.conectorFuente);
	}

	public void setConectorFuente(TipoConectorEnum conectorFuente) {
		this.conectorFuente = conectorFuente.getCode();
	}

	public TipoConectorEnum getConectorDestino() {
		return TipoConectorEnum.getTipoConectorEnum(this.conectorDestino);
	}

	public void setConectorDestino(TipoConectorEnum conectorDestino) {
		this.conectorDestino = conectorDestino.getCode();
	}

}
package com.udb.service;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.mysema.query.types.expr.BooleanExpression;
import com.org.util.repository.BaseRepository;
import com.org.util.service.BaseService;
import com.udb.model.Estado;
import com.udb.model.QTransicion;
import com.udb.model.Transicion;
import com.udb.repository.EstadoRepository;
import com.udb.repository.TransicionRepository;

@Stateless
public class TransicionService extends BaseService<Transicion, Long> {

	@Inject
	private TransicionRepository transicionRepository;

	@Inject
	private EstadoRepository estadoRepository;

	private static final QTransicion qTransicion = QTransicion.transicion;

	@Override
	public BaseRepository<Transicion, Long> getRepository() {
		return transicionRepository;
	}

	public Transicion findTransicion(Estado etapaInicial, Estado etapaFinal, String nombre) {
		return transicionRepository
				.findOne(qTransicion.etapaInicial.eq(etapaInicial)
						.and(qTransicion.etapaFinal.eq(etapaFinal))
						.and(qTransicion.nombre.eq(nombre)));
	}

	public List<Transicion> findbyEtapaInicial(Estado estadoInicial) {
		BooleanExpression byEstadoIni = QTransicion.transicion.etapaInicial.eq(estadoInicial);
		return (List<Transicion>) transicionRepository.findAll(byEstadoIni);
	}

	public List<Transicion> findbyEtapaFinal(Estado estadoFinal) {
		BooleanExpression byEstadoFin = QTransicion.transicion.etapaFinal.eq(estadoFinal);
		return (List<Transicion>) transicionRepository.findAll(byEstadoFin);
	}

	public void saveDiagram(List<Estado> etapaList, List<Transicion> transicionList) {

		estadoRepository.save(etapaList);

		List<Transicion> deleteTransicion = new ArrayList<>();
		for (Transicion transicion : getRepository().findAll()) {
			if (!transicionList.contains(transicion)) {
				deleteTransicion.add(transicion);
			}
		}

		for (Transicion transicion : deleteTransicion) {
			delete(transicion);
		}

		save(transicionList);

	}

}

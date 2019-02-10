package com.udb.service;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
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

	/**
	 * Find transicion.
	 *
	 * @param etapaInicial
	 *            the etapa inicial
	 * @param etapaFinal
	 *            the etapa final
	 * @param workflowDocumento
	 *            the workflow documento
	 * @return the transicion
	 */
	public Transicion findTransicion(Estado etapaInicial, Estado etapaFinal) {
		return transicionRepository
				.findOne(qTransicion.etapaInicial.eq(etapaInicial).and(qTransicion.etapaFinal.eq(etapaFinal)));
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

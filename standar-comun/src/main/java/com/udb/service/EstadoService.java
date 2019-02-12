package com.udb.service;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.org.security.enums.TipoEtapa;
import com.org.util.repository.BaseRepository;
import com.org.util.service.BaseService;
import com.udb.model.Estado;
import com.udb.model.QEstado;
import com.udb.repository.EstadoRepository;

@Stateless
public class EstadoService extends BaseService<Estado, Long> {

	@Inject
	private EstadoRepository estadoRepository;

	@Override
	public BaseRepository<Estado, Long> getRepository() {
		return estadoRepository;
	}

	public Estado findEstadoByInitialStage() {
		return newJpaQuery().from(QEstado.estado).where(QEstado.estado.tipoEtapa.eq(TipoEtapa.INICIAL.getCode()))
				.singleResult(QEstado.estado);
	}

}

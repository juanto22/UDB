/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.udb.diagram.config.event;

import javax.faces.component.UIComponent;
import javax.faces.component.behavior.Behavior;
import javax.faces.event.AjaxBehaviorEvent;
import javax.faces.event.AjaxBehaviorListener;
import javax.faces.event.FacesListener;
import org.primefaces.model.diagram.Element;

/**
 *
 * @author jose.valle
 */
public class ElementDropEvent extends AjaxBehaviorEvent {

    private static final long serialVersionUID = -4785129492262951865L;
    private Element element;

    public ElementDropEvent(UIComponent component, Behavior behavior, Element element, String ejex, String ejey) {
        super(component, behavior);
        this.element = element;
        this.element.setX(ejex);
        this.element.setY(ejey);
    }

    @Override
    public boolean isAppropriateListener(FacesListener listener) {
        return (listener instanceof AjaxBehaviorListener);
    }

    @Override
    public void processListener(FacesListener listener) {
        ((AjaxBehaviorListener) listener).processAjaxBehavior(this);
    }

    public Element getElement() {
        return element;
    }

}

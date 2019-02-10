/*
+/*
+ * Copyright 2009-2014 PrimeTek.
+ *
+ * Licensed under the Apache License, Version 2.0 (the "License");
+ * you may not use this file except in compliance with the License.
+ * You may obtain a copy of the License at
+ *
+ * http://www.apache.org/licenses/LICENSE-2.0
+ *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.udb.diagram.config.event;

import javax.faces.component.UIComponent;
import javax.faces.component.behavior.Behavior;
import javax.faces.event.AjaxBehaviorEvent;
import javax.faces.event.AjaxBehaviorListener;
import javax.faces.event.FacesListener;
import org.primefaces.model.diagram.Element;

public class ConnectionClickEvent extends AjaxBehaviorEvent {

    private Element sourceElement;
    private Element targetElement;
    
    public ConnectionClickEvent(UIComponent component, Behavior behavior, Element sourceElement, Element targetElement) {
        super(component, behavior);
        this.sourceElement = sourceElement;
        this.targetElement = targetElement;
    }

   @Override
    public boolean isAppropriateListener(FacesListener listener) {
        return (listener instanceof AjaxBehaviorListener);
    }

    @Override
    public void processListener(FacesListener listener) {
        ((AjaxBehaviorListener) listener).processAjaxBehavior(this);
    }

    public Element getSourceElement() {
        return sourceElement;
    }

    public Element getTargetElement() {
        return targetElement;
    }

}

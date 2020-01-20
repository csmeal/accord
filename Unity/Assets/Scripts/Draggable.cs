﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class Draggable: MonoBehaviour, IDragHandler
{
    public void OnBeginDrag(PointerEventData eventData){
        Debug.Log("OnBeginDrag");
    }

    public void OnDrag(PointerEventData eventData){
        Debug.Log("Drag");
        this.transform.position = eventData.position;
    }

    public void OnEndDrag(PointerEventData eventData){
        Debug.Log("EndDrag");
    }
}

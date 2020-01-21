using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class DropHandler : MonoBehaviour, IDropHandler, IPointerEnterHandler, IPointerExitHandler
{
  public void OnDrop(PointerEventData pointData)
  {
    Debug.Log(pointData.pointerDrag.name + " was dropped on " + this.gameObject.name);
    DragCard d = pointData.pointerDrag.GetComponent<DragCard>();
    if (d != null)
    {
      d.parentToReturnTo = this.transform;
    }
    else
    {
      Debug.Log("draggable what");
    }
  }

  public void OnPointerEnter(PointerEventData pointData)
  {
    if (pointData.pointerDrag == null)
      return;

    DragCard d = pointData.pointerDrag.GetComponent<DragCard>();
    if (d != null)
    {
      d.placeholderParent = this.transform;
    }
  }
  public void OnPointerExit(PointerEventData pointData)
  {
    if (pointData.pointerDrag == null)
      return;

    DragCard d = pointData.pointerDrag.GetComponent<DragCard>();
    if (d != null && d.placeholderParent == this.transform)
    {
      d.placeholderParent = d.parentToReturnTo;
    }
  }
}

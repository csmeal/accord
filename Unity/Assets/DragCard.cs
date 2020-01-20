using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;

public class DragCard : MonoBehaviour, IBeginDragHandler, IEndDragHandler, IDragHandler
{
  public Transform parentToReturnTo = null;
  public Transform placeholderParent = null;

  GameObject placeholder = null;

  public void OnBeginDrag(PointerEventData eventData)
  {
    placeholder = new GameObject();
    placeholder.transform.SetParent(this.transform.parent);
    LayoutElement le = placeholder.AddComponent<LayoutElement>();
    LayoutElement thisEle = this.GetComponent<LayoutElement>();
    if (thisEle != null)
    {
      //(float)(.9) * 
      le.preferredWidth = this.GetComponent<LayoutElement>().preferredWidth;
      le.preferredHeight = this.GetComponent<LayoutElement>().preferredHeight;
      le.flexibleWidth = 0;
      le.flexibleHeight = 0;
    }
    else
    {
      Debug.Log("sdfs");
    }
    placeholder.transform.SetSiblingIndex(this.transform.GetSiblingIndex());
    this.parentToReturnTo = this.transform.parent;
    this.transform.SetParent(this.transform.parent.parent);


    GetComponent<CanvasGroup>().blocksRaycasts = false;
  }

  public void OnDrag(PointerEventData eventData)
  {
    transform.position = eventData.position;

    int newSiblingIndex = placeholder.transform.GetSiblingIndex();
    for (int i = 0; i < parentToReturnTo.childCount; i++)
    {



      if (this.transform.position.x < parentToReturnTo.GetChild(i).position.x)
      {

        placeholder.transform.SetSiblingIndex(i);

        break;
      }
    }


  }

  public void OnEndDrag(PointerEventData eventData)
  {


    this.transform.SetParent(this.parentToReturnTo);
    this.transform.SetSiblingIndex(placeholder.transform.GetSiblingIndex());
    GetComponent<CanvasGroup>().blocksRaycasts = true;
    Destroy(placeholder);
  }
}

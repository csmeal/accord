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
    LayoutElement thisEle = this.transform.GetComponent<LayoutElement>();
    LayoutElement le = placeholder.AddComponent<LayoutElement>();

    if (thisEle != null)
    {
      //(float)(.9) * 
      Debug.Log("Found element: " + thisEle.name);
      le.preferredWidth = this.GetComponent<LayoutElement>().preferredWidth;
      le.preferredHeight = this.GetComponent<LayoutElement>().preferredHeight;
      le.flexibleWidth = 0;
      le.flexibleHeight = 0;
    }
    else
    {
      le.flexibleWidth = 0;
      le.flexibleHeight = 0;
      Debug.Log("Failed to find element: " + this.name);
    }
    placeholder.transform.SetSiblingIndex(this.transform.GetSiblingIndex());
    this.parentToReturnTo = this.transform.parent;
    this.placeholderParent = this.parentToReturnTo;
    this.transform.SetParent(this.transform.parent.parent);


    GetComponent<CanvasGroup>().blocksRaycasts = false;
  }

  public void OnDrag(PointerEventData eventData)
  {
    //Debug.Log ("OnDrag");

    this.transform.position = eventData.position;

    if (placeholder.transform.parent != placeholderParent)
      placeholder.transform.SetParent(placeholderParent);

    int newSiblingIndex = placeholderParent.childCount;

    for (int i = 0; i < placeholderParent.childCount; i++)
    {
      if (this.transform.position.x < placeholderParent.GetChild(i).position.x)
      {

        newSiblingIndex = i;

        if (placeholder.transform.GetSiblingIndex() < newSiblingIndex)
          newSiblingIndex--;

        break;
      }
    }

    placeholder.transform.SetSiblingIndex(newSiblingIndex);



  }

  public void OnEndDrag(PointerEventData eventData)
  {


    this.transform.SetParent(this.parentToReturnTo);
    this.transform.SetSiblingIndex(placeholder.transform.GetSiblingIndex());
    GetComponent<CanvasGroup>().blocksRaycasts = true;
    Destroy(placeholder);
  }
}

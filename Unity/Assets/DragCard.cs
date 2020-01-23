using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;

public class DragCard : MonoBehaviour, IBeginDragHandler, IEndDragHandler, IDragHandler, IPointerEnterHandler, IPointerExitHandler
{
  public Transform parentToReturnTo = null;
  public Transform placeholderParent = null;

  public GameObject placeholder = null;

  private GameObject mouseover = null;

  private Vector3 scale = new Vector3(0, 0);

  void OnMouseOver()
  {
    //If your mouse hovers over the GameObject with the script attached, output this message
    Debug.Log("Mouse is over GameObject.");
  }

  void OnMouseExit()
  {
    //The mouse is no longer hovering over the GameObject so output this message each frame
    Debug.Log("Mouse is no longer on GameObject.");
  }

  public void OnBeginDrag(PointerEventData eventData)
  {
    placeholder = new GameObject();
    placeholder.transform.SetParent(this.transform.parent);
    LayoutElement thisEle = this.transform.GetComponent<LayoutElement>();
    LayoutElement le = placeholder.AddComponent<LayoutElement>();

    if (thisEle != null)
    {
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
    }
    placeholder.transform.SetSiblingIndex(this.transform.GetSiblingIndex());
    this.parentToReturnTo = this.transform.parent;
    this.placeholderParent = this.parentToReturnTo;
    this.transform.SetParent(this.transform.parent.parent);


    GetComponent<CanvasGroup>().blocksRaycasts = false;
  }

  public void OnDrag(PointerEventData eventData)
  {

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

  public void OnPointerEnter(PointerEventData pointData)
  {
    Debug.Log("Entering: " + this.name);
    mouseover = Instantiate(this.gameObject); // clone box
    scale = mouseover.transform.localScale;
    transform.localScale += new Vector3(0.3F, .3F, 1);
    Debug.Log(mouseover.transform.position.x);
  }

  public void OnPointerExit(PointerEventData pointData)
  {
    Debug.Log("Exiting: " + this.name);
    transform.localScale = scale;
    Destroy(mouseover);
  }


}

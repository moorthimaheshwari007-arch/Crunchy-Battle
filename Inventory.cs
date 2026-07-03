using System.Collections.Generic;
using UnityEngine;

public class INVENTORY : MonoBehaviour
{
    public List<ITEM> items = new List<ITEM>();

    public void AddItem(ITEM item)
    {
        items.Add(item);
        Debug.Log("Picked: " + item.name);
    }
}

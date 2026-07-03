using UnityEngine;

public class LOOT : MonoBehaviour
{
    public ITEM item;

    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            other.GetComponent<INVENTORY>().AddItem(item);
            Destroy(gameObject);
        }
    }
}

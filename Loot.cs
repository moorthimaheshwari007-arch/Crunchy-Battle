using UnityEngine;

public class Loot : MonoBehaviour
{
    public string itemName;

    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            Debug.Log("Picked: " + itemName);
            Destroy(gameObject);
        }
    }
}

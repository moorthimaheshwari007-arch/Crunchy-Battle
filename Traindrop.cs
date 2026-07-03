using UnityEngine;

public class TrainDrop : MonoBehaviour
{
    public Transform seat;
    public GameObject player;

    void Start()
    {
        player.transform.position = seat.position;
        player.transform.parent = seat;
    }

    public void Drop()
    {
        player.transform.parent = null;
        player.GetComponent<PlayerController>().StartFall();
    }
}

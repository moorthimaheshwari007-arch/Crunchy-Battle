using UnityEngine;

public class TrainDrop : MonoBehaviour
{
    public GameObject player;
    public Transform seat;

    public bool isOnTrain = true;

    void Start()
    {
        if (player != null && seat != null)
        {
            player.transform.position = seat.position;
            player.transform.parent = seat;

            isOnTrain = true;
        }
    }

    public void DropFromTrain()
    {
        if (!isOnTrain) return;

        player.transform.parent = null;

        PlayerController pc = player.GetComponent<PlayerController>();
        if (pc != null)
        {
            pc.StartFall();
        }

        isOnTrain = false;
    }
}

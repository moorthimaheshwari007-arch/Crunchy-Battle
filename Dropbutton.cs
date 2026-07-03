using UnityEngine;

public class DropButton : MonoBehaviour
{
    public TrainDrop trainDrop;

    public void Drop()
    {
        trainDrop.DropFromTrain();
    }
}

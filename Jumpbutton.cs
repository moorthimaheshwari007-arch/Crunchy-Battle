using UnityEngine;

public class JumpButton : MonoBehaviour
{
    public TrainJump trainJump;

    public void Jump()
    {
        trainJump.JumpFromTrain();
    }
}

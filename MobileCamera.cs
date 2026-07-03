using UnityEngine;

public class CameraLook : MonoBehaviour
{
    public Transform player;
    public float sensitivity = 0.2f;

    void Update()
    {
        if (Input.touchCount == 1)
        {
            Touch t = Input.GetTouch(0);

            if (t.phase == TouchPhase.Moved)
            {
                player.Rotate(0, t.deltaPosition.x * sensitivity, 0);
            }
        }
    }
}

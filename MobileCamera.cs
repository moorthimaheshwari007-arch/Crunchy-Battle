using UnityEngine;

public class CAMERA : MonoBehaviour
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
                float rot = t.deltaPosition.x * sensitivity;
                player.Rotate(0, rot, 0);
            }
        }
    }
}

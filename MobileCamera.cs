using UnityEngine;

public class MOBILECAMERA : MonoBehaviour
{
    public float sensitivity = 0.1f;
    public Transform player;

    private float rotationX;

    void Update()
    {
        if (Input.touchCount == 1)
        {
            Touch t = Input.GetTouch(0);

            if (t.phase == TouchPhase.Moved)
            {
                float rotY = t.deltaPosition.x * sensitivity;

                player.Rotate(0, rotY, 0);
            }
        }
    }
}

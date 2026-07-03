using UnityEngine;

public class PLAYER : MonoBehaviour
{
    public CharacterController controller;
    public FloatingJoystick joystick;

    public float speed = 5f;
    public Transform cameraTransform;

    void Update()
    {
        Vector3 move = transform.right * joystick.Horizontal + transform.forward * joystick.Vertical;
        controller.Move(move * speed * Time.deltaTime);
    }
}

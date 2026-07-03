using UnityEngine;

public class MOBILEPLAYER : MonoBehaviour
{
    public CharacterController controller;
    public float speed = 5f;

    public FloatingJoystick joystick;

    void Update()
    {
        Vector3 move = transform.right * joystick.Horizontal + transform.forward * joystick.Vertical;
        controller.Move(move * speed * Time.deltaTime);
    }
}

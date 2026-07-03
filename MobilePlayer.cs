using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public CharacterController controller;
    public FloatingJoystick joystick;

    public float speed = 5f;

    public int health = 100;

    public bool falling;

    void Update()
    {
        Vector3 move =
            transform.right * joystick.Horizontal +
            transform.forward * joystick.Vertical;

        controller.Move(move * speed * Time.deltaTime);

        if (falling)
        {
            controller.Move(Vector3.down * 6f * Time.deltaTime);
        }
    }

    public void StartFall()
    {
        falling = true;
    }

    public void TakeDamage(int dmg)
    {
        health -= dmg;

        if (health <= 0)
        {
            Debug.Log("PLAYER DEAD");
        }
    }
}

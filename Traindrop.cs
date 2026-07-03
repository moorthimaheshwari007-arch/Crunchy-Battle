using UnityEngine;

public class TrainJump : MonoBehaviour
{
    public Animator playerAnim;
    public CharacterController controller;

    public float jumpForce = 5f;
    private Vector3 velocity;

    public void JumpFromTrain()
    {
        playerAnim.SetTrigger("jump");

        transform.parent = null;

        velocity.y = jumpForce;
    }

    void Update()
    {
        velocity.y += Physics.gravity.y * Time.deltaTime;
        controller.Move(velocity * Time.deltaTime);
    }
}

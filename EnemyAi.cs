using UnityEngine;

public class ENEMYAI : MonoBehaviour
{
    public Transform player;
    public float speed = 2f;

    void Update()
    {
        transform.LookAt(player);

        transform.position = Vector3.MoveTowards(
            transform.position,
            player.position,
            speed * Time.deltaTime
        );
    }
}

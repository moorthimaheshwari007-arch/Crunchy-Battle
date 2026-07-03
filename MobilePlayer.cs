using UnityEngine;

public class PlayerHealth : MonoBehaviour
{
    public int health = 100;

    public void TakeDamage(int dmg)
    {
        health -= dmg;

        if (health <= 0)
        {
            Debug.Log("GAME OVER");
        }
    }
}

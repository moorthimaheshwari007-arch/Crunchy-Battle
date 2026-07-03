using UnityEngine;

public class HEALTH : MonoBehaviour
{
    public int hp = 100;

    public void TakeDamage(int dmg)
    {
        hp -= dmg;
        if (hp <= 0)
        {
            Debug.Log("PLAYER DEAD");
        }
    }
}

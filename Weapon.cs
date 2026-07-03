using UnityEngine;

public class BULLET : MonoBehaviour
{
    public float speed = 25f;
    public int damage = 20;

    void Update()
    {
        transform.Translate(Vector3.forward * speed * Time.deltaTime);
    }

    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Enemy"))
        {
            other.GetComponent<ENEMY>().TakeDamage(damage);
            Destroy(gameObject);
        }
    }
}

using UnityEngine;

public class WEAPON : MonoBehaviour
{
    public GameObject bullet;
    public Transform firePoint;

    public void Shoot()
    {
        Instantiate(bullet, firePoint.position, firePoint.rotation);
    }
}

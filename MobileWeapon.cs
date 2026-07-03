using UnityEngine;

public class MOBILEWEAPON : MonoBehaviour
{
    public GameObject bullet;
    public Transform firePoint;

    public void Shoot()
    {
        Instantiate(bullet, firePoint.position, firePoint.rotation);
    }
}

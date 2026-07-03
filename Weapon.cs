using UnityEngine;

public class GunSystem : MonoBehaviour
{
    public GameObject bullet;
    public Transform firePoint;

    public int ammo = 30;
    public int maxAmmo = 30;

    public float fireRate = 0.15f;
    float nextFire;

    public void Shoot()
    {
        if (Time.time < nextFire || ammo <= 0) return;

        Instantiate(bullet, firePoint.position, firePoint.rotation);
        ammo--;

        nextFire = Time.time + fireRate;
    }

    public void Reload()
    {
        ammo = maxAmmo;
    }
}

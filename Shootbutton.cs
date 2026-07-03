using UnityEngine;

public class ShootButton : MonoBehaviour
{
    public GunSystem gun;

    public void Shoot()
    {
        gun.Shoot();
    }
}

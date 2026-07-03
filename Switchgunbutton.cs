using UnityEngine;

public class SwitchGunButton : MonoBehaviour
{
    public GunSystem gun;

    public void SwitchGun()
    {
        gun.SwitchGun();
    }
}

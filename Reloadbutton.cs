using UnityEngine;

public class ReloadButton : MonoBehaviour
{
    public GunSystem gun;

    public void Reload()
    {
        gun.Reload();
    }
}

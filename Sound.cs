using UnityEngine;

public class SOUND : MonoBehaviour
{
    public AudioSource shoot;

    public void PlayShoot()
    {
        shoot.Play();
    }
}

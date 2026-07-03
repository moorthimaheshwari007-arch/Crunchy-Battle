using UnityEngine;

public class HallSystem : MonoBehaviour
{
    public GameObject floor;
    public GameObject wall;

    void Start()
    {
        Instantiate(floor, transform.position, Quaternion.identity);

        Instantiate(wall, transform.position + new Vector3(0,0,10), Quaternion.identity);
        Instantiate(wall, transform.position + new Vector3(0,0,-10), Quaternion.identity);
        Instantiate(wall, transform.position + new Vector3(10,0,0), Quaternion.Euler(0,90,0));
        Instantiate(wall, transform.position + new Vector3(-10,0,0), Quaternion.Euler(0,90,0));
    }
}

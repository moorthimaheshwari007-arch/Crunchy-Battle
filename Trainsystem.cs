using UnityEngine;

public class TrainSystem : MonoBehaviour
{
    public Transform[] points;
    public float speed = 10f;

    int index = 0;

    void Update()
    {
        if (points.Length == 0) return;

        transform.position = Vector3.MoveTowards(
            transform.position,
            points[index].position,
            speed * Time.deltaTime
        );

        if (Vector3.Distance(transform.position, points[index].position) < 1f)
        {
            index = (index + 1) % points.Length;
        }
    }
}

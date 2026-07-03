using UnityEngine;

public class TrainSystem : MonoBehaviour
{
    public Transform[] points;
    public float speed = 10f;

    int index = 0;

    void Update()
    {
        if (points == null || points.Length == 0) return;

        Transform target = points[index];

        transform.position = Vector3.MoveTowards(
            transform.position,
            target.position,
            speed * Time.deltaTime
        );

        if (Vector3.Distance(transform.position, target.position) < 1f)
        {
            index++;

            if (index >= points.Length)
                index = 0;
        }
    }
}

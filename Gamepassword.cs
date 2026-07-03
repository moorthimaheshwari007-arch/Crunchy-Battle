using UnityEngine;

public class GamePassword : MonoBehaviour
{
    public string correctPassword = "START123";

    public GameObject gameUI;
    public GameObject loginUI;

    public void CheckPassword(string input)
    {
        if (input == correctPassword)
        {
            loginUI.SetActive(false);
            gameUI.SetActive(true);
        }
        else
        {
            Debug.Log("Wrong Password");
        }
    }
}

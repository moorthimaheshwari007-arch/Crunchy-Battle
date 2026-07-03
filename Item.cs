using UnityEngine;

public enum ITEMTYPE
{
    Weapon,
    Ammo,
    Health
}

[System.Serializable]
public class ITEM
{
    public string name;
    public ITEMTYPE type;
}



#include <iostream>
using namespace std;

class SpaceShip
{
};
class ApolloSpacecraft : public SpaceShip
{
};

class Asteroid
{
public:
    virtual void CollideWith(SpaceShip &)
    {
        std::cout << "Asteroid hit a SpaceShip\n";
    }
    virtual void CollideWith(ApolloSpacecraft &)
    {
        std::cout << "Asteroid hit an ApolloSpacecraft\n";
    }
};

class ExplodingAsteroid : public Asteroid
{
public:
    void CollideWith(SpaceShip &) override
    {
        std::cout << "ExplodingAsteroid hit a SpaceShip\n";
    }
    void CollideWith(ApolloSpacecraft &) override
    {
        std::cout << "ExplodingAsteroid hit an ApolloSpacecraft\n";
    }
};

SpaceShip theSpaceShip;
ApolloSpacecraft theApolloSpacecraft;
ExplodingAsteroid theExplodingAsteroid;

theExplodingAsteroid.CollideWith(theSpaceShip);        // ExplodingAsteroid hit a SpaceShip
theExplodingAsteroid.CollideWith(theApolloSpacecraft); // ExplodingAsteroid hit an ApolloSpacecraft

Asteroid &theAsteroidReference = theExplodingAsteroid;
theAsteroidReference.CollideWith(theSpaceShip);        // Asteroid hit a SpaceShip
theAsteroidReference.CollideWith(theApolloSpacecraft); // Asteroid hit an ApolloSpacecraft
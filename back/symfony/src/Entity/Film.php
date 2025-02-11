<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ApiResource(
    normalizationContext: ['groups' => ['film:read']],
    denormalizationContext: ['groups' => ['film:write']],
    operations: [
        new GetCollection(),
        new Get(),
        new Post(security: "is_granted('FILM_CREATE')"),
        new Put(security: "is_granted('FILM_EDIT')"),
        new Delete(security: "is_granted('FILM_DELETE')")
    ]
)]
class Film
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['film:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['film:read', 'film:write'])]
    private string $nom;

    #[ORM\Column(length: 255)]
    #[Groups(['film:read', 'film:write'])]
    private string $genre;

    #[ORM\Column]
    #[Groups(['film:read', 'film:write'])]
    private int $duree;

    #[ORM\Column]
    #[Groups(['film:read', 'film:write'])]
    private int $annee;

    #[ORM\Column(length: 255)]
    #[Groups(['film:read', 'film:write'])]
    private string $realisateur;

    // Getters & Setters

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;
        return $this;
    }

    public function getGenre(): string
    {
        return $this->genre;
    }

    public function setGenre(string $genre): self
    {
        $this->genre = $genre;
        return $this;
    }

    public function getDuree(): int
    {
        return $this->duree;
    }

    public function setDuree(int $duree): self
    {
        $this->duree = $duree;
        return $this;
    }

    public function getAnnee(): int
    {
        return $this->annee;
    }

    public function setAnnee(int $annee): self
    {
        $this->annee = $annee;
        return $this;
    }

    public function getRealisateur(): string
    {
        return $this->realisateur;
    }

    public function setRealisateur(string $realisateur): self
    {
        $this->realisateur = $realisateur;
        return $this;
    }
}

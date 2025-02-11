<?php

namespace App\Security\Voter;

use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class FilmVoter extends Voter
{
    private RequestStack $requestStack;

    public function __construct(RequestStack $requestStack)
    {
        $this->requestStack = $requestStack;
    }

    protected function supports(string $attribute, mixed $subject): bool
    {
        return in_array($attribute, ['FILM_CREATE', 'FILM_EDIT', 'FILM_DELETE']);
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        // URL du service d'authentification externe
        $authServiceUrl = 'https://auth-service.com/check';

        // Récupérer la requête HTTP courante
        $request = $this->requestStack->getCurrentRequest();

        // Vérifier si l'utilisateur a un token d'authentification
        $userToken = $request->headers->get('Authorization');

        if (!$userToken) {
            return false; // Pas de token, refusé
        }

        // Appel API d'authentification
        $context = stream_context_create([
            'http' => [
                'method' => 'GET',
                'header' => "Authorization: $userToken\r\n"
            ]
        ]);

        $response = @file_get_contents($authServiceUrl, false, $context);

        if (!$response) {
            return false; // Si l'API ne répond pas, on refuse l'accès
        }

        $authData = json_decode($response, true);

        return $authData['authenticated'] ?? false;
    }
}

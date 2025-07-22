;; provider-registry.clar

;; Decentralized Mobile Network Marketplace - Provider Registry Contract

;; -------------------------
;; ADMINISTRATIVE STRUCTURE
;; -------------------------
(define-data-var admin principal tx-sender)

;; -------------------------
;; ERROR CONSTANTS
;; -------------------------
(define-constant ERR-NOT-AUTHORIZED u100)
(define-constant ERR-ALREADY-VERIFIED u101)
(define-constant ERR-NOT-FOUND u102)

;; -------------------------
;; DATA MAPS
;; -------------------------
(define-map verified-providers principal bool)

;; -------------------------
;; PRIVATE FUNCTIONS
;; -------------------------
(define-private (is-admin)
  (is-eq tx-sender (var-get admin))
)

;; -------------------------
;; PUBLIC FUNCTIONS
;; -------------------------

;; Add a verified provider (only admin)
(define-public (add-provider (provider principal))
  (begin
    (asserts! (is-admin) (err ERR-NOT-AUTHORIZED))
    (asserts! (is-none (map-get? verified-providers provider)) (err ERR-ALREADY-VERIFIED))
    (map-set verified-providers provider true)
    (ok true)
  )
)

;; Remove a verified provider (only admin)
(define-public (remove-provider (provider principal))
  (begin
    (asserts! (is-admin) (err ERR-NOT-AUTHORIZED))
    (asserts! (is-some (map-get? verified-providers provider)) (err ERR-NOT-FOUND))
    (map-delete verified-providers provider)
    (ok true)
  )
)

;; Transfer admin rights
(define-public (transfer-admin (new-admin principal))
  (begin
    (asserts! (is-admin) (err ERR-NOT-AUTHORIZED))
    (var-set admin new-admin)
    (ok true)
  )
)

;; Check if provider is verified
(define-read-only (is-verified-provider (provider principal))
  (default-to false (map-get? verified-providers provider))
)

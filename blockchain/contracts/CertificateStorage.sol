// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CertificateStorage {
    struct Certificate {
        bytes32 hash;       // certificate ka hash
        string studentId;   // roll no ya id
        uint256 issueDate;  // blockchain timestamp
    }

    mapping(bytes32 => Certificate) public certificates;

    // Certificate store karne ka function
    function storeCertificate(bytes32 _hash, string memory _studentId) public {
        require(certificates[_hash].hash == 0, "Certificate already exists");
        certificates[_hash] = Certificate(_hash, _studentId, block.timestamp);
    }

    // Certificate verify karne ka function
    function verifyCertificate(bytes32 _hash) public view returns (bool) {
        return certificates[_hash].hash != 0;
    }
}

package com.hostel.management.service;

import com.hostel.management.entity.Room;
import com.hostel.management.repository.RoomRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public Room addRoom(Room room) {

        if (room.getOccupied() == null) {
            room.setOccupied(0);
        }

        if (room.getStatus() == null) {
            room.setStatus("AVAILABLE");
        }

        return roomRepository.save(room);
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    public Room updateRoom(Long id, Room room) {

        Optional<Room> existing =
                roomRepository.findById(id);

        if (existing.isEmpty()) {
            return null;
        }

        Room r = existing.get();

        r.setRoomNumber(room.getRoomNumber());
        r.setBlock(room.getBlock());
        r.setFloor(room.getFloor());
        r.setCapacity(room.getCapacity());
        r.setOccupied(room.getOccupied());
        r.setStatus(room.getStatus());

        return roomRepository.save(r);
    }

    public boolean deleteRoom(Long id) {

        if (!roomRepository.existsById(id)) {
            return false;
        }

        roomRepository.deleteById(id);

        return true;
    }
}